const router = require('express').Router();
const { getAll, getAllCompleted, getAllToDo, getMine, create, getOne, edit, remove } = require('../services/taskService');
const { getUserById } = require('../services/authService');

router.get('/all', async (req, res) => {
    const tasks = await getAll(req.query.search);
    res.render('taskPageAll', { tasks });
});

router.get('/archive', async (req, res) => {
    const completed = await getAllCompleted(req.query.search);
    res.render('taskPageArchive', { completed });
});

router.get('/to-do', async (req, res) => {
    const toDoList = await getAllToDo(req.query.search);
    res.render('taskPageToDo', { toDoList });
});

router.get('/my-tasks', async (req, res) => {
    console.log(req.userId);
    const myTasks = await getMine(req.query.search, req.user._id);
    res.render('taskPageMine', { myTasks });
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Task' });
});

router.post('/create', async (req, res) => {
    if (!req.body) throw new Error({ message: 'Content is required' });
    const task = req.body;
    task.creator = req.user._id;
    task.isCompleted = false;
    task.completor = '';

    try {
        await create(task);
        res.redirect('/to-do');
    } catch (error) {
        res.render('create', { error });
    }
});

router.get('/:id/details', async (req, res) => {
    try {
        let task = await getOne(req.params.id);

        if (task.completor) {
            let user = await getUserById(task.completor);
            task.completor = user.username;

            let completedAt = task.updated_at;
            let time = completedAt.toString().split(' ');
            task.date = `${time[2]} ${time[1]} ${time[3]}`;
            task.hour = time[4].slice(0, 5);
        }

        res.render('details', { task });

    } catch (error) {
        res.redirect('/404');
    }
});

router.get('/:id/complete', async (req, res) => {
    try {
        const task = await getOne(req.params.id);
        task.isCompleted = true;
        task.completor = req.user._id;

        await edit(req.params.id, task);
        res.redirect('/to-do');
    } catch (error) {
        res.redirect('/404');
    }
});

router.get('/:id/delete', async (req, res) => {
    try {
        await remove(req.params.id);
        res.redirect('/to-do');
    } catch (error) {
        res.redirect('/404');
    }
});


router.all('*', (req, res) => {
    res.render('404', { title: 'Page Not Found' });
});

module.exports = router;