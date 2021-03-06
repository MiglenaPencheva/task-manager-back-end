const Task = require('../models/Task');

async function getAll(query) {
    return await Task
        .find({ content: { $regex: query || '', $options: 'i' } })
        .sort({ 'created_at': 1 })
        .lean();
}

async function getAllToDo(query) {
    return await Task
        .find({
            isCompleted: false,
            content: { $regex: query || '', $options: 'i' }
        })
        .sort({ 'created_at': 1 })
        .lean();
}

async function getAllCompleted(query) {
    return await Task
        .find({
            isCompleted: true,
            content: { $regex: query || '', $options: 'i' }
        })
        .sort({ 'created_at': 1 })
        .lean();
}

async function getMine(query, userId) {
    return await Task
        .find({
            creator: userId,
            content: { $regex: query || '', $options: 'i' }
        })
        .sort({ 'created_at': 1 })
        .lean();
}

async function getOne(taskId) {
    const task = await Task.findById(taskId).lean();
    if (task) {
        return task;
    } else {
        return undefined;
    }
}

async function create(data) {
    let task = new Task(data);
    return task.save();
}

async function complete(taskId, userId) {
    const task = await Task.findById(taskId);
    if (!task) {
        throw new ReferenceError('No such ID in database');
    }
    task.isCompleted = true;
    task.completer = userId;
    return task.save();
}

async function remove(taskId) {
    return await Task.deleteOne({ _id: taskId });
}

module.exports = {
    getAll,
    getAllToDo,
    getAllCompleted,
    getMine,
    getOne,
    create,
    complete,
    remove,
};