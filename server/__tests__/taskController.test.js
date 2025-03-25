const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Task = require('../models/Task');
const taskController = require('../controllers/taskController');

let mongoServer;
const initialTaskData = {
  title: 'Test Task',
  description: 'Test Description',
  priority: 'medium',
  dueDate: '2024-12-31',
  completed: false
};

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Task Controller', () => {
  let mockReq;
  let mockRes;

  beforeEach(async () => {
    await Task.deleteMany({});
    
    // Reset mock request and response for each test
    mockReq = {
      user: {
        id: new mongoose.Types.ObjectId()
      },
      body: { ...initialTaskData },
      params: {}
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('getTasks', () => {
    it('should get all tasks for the user', async () => {
      // Create a test task
      await Task.create({
        ...mockReq.body,
        user: mockReq.user.id
      });

      await taskController.getTasks(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          count: 1
        })
      );
    });
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      await taskController.createTask(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          data: expect.objectContaining({
            title: mockReq.body.title,
            description: mockReq.body.description,
            priority: mockReq.body.priority,
            user: mockReq.user.id
          })
        })
      );
    });

    it('should return 400 for invalid task data', async () => {
      mockReq.body.title = ''; // Invalid: empty title

      await taskController.createTask(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false
        })
      );
    });
  });

  describe('updateTask', () => {
    it('should update an existing task', async () => {
      // Create a task first
      const task = await Task.create({
        ...mockReq.body,
        user: mockReq.user.id
      });

      // Use the same user ID for the update request
      mockReq.params.id = task._id;
      mockReq.body.title = 'Updated Task';
      mockReq.user.id = task.user.toString(); // Convert ObjectId to string

      await taskController.updateTask(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          data: expect.objectContaining({
            title: 'Updated Task'
          })
        })
      );
    });

    it('should return 404 for non-existent task', async () => {
      mockReq.params.id = new mongoose.Types.ObjectId();

      await taskController.updateTask(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Task not found'
        })
      );
    });
  });

  describe('deleteTask', () => {
    it('should delete an existing task', async () => {
      // Create a task first
      const task = await Task.create({
        ...mockReq.body,
        user: mockReq.user.id
      });

      // Use the same user ID for the delete request
      mockReq.params.id = task._id;
      mockReq.user.id = task.user.toString(); // Convert ObjectId to string

      await taskController.deleteTask(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true
        })
      );

      // Verify task was deleted
      const deletedTask = await Task.findById(task._id);
      expect(deletedTask).toBeNull();
    });

    it('should return 404 for non-existent task', async () => {
      mockReq.params.id = new mongoose.Types.ObjectId();

      await taskController.deleteTask(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Task not found'
        })
      );
    });
  });
}); 