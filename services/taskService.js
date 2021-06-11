const Task = require('../models/Task');

async function getAll(query) {
    return await Task
        .find({ content: { $regex: query || '', $options: 'i' } })
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

async function create(data, userId) {
    let task = new Task(data);
    task.creator = userId;
    task.isCompleted = false;
    return task.save();
}

// async function edit(taskId, task) {
//     const existing = await Task.findById(taskId);
//     if (!existing) {
//         throw new ReferenceError('No such ID in database');
//     }
//     Object.assign(existing, cube)
//     return existing.save();
// }

// async function remove(taskId) {
//     return await Task.deleteOne({ _id: taskId });
// }

module.exports = {
    getAll,
    getOne,
    create,
    // edit,
    // remove,
};