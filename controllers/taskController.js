const router = require('express').Router();
const { getAll, getAllCompleted, getAllToDo, getMine, create, getOne, edit, remove  } = require('../services/taskService');

router.get('/', async (req, res) => {
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
    const myTasks = await getMine(req.query.search);
    res.render('taskPageMine', { myTasks });
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Task' });
});

router.post('/create', async (req, res) => {
    if (!req.body) throw new Error({ message: 'Content is required' });
    const task = req.body;
    task.isCompleted = false;
    task.completor = '';

    try {
        await create(task);
        res.redirect('/');
    } catch (error) {
        res.render('create', { error });
    }
});

router.get('/:id/details', async (req, res) => {
    let task = await getOne(req.params.id);

    if (task) {
        res.render('details', { task });
    } else {
        res.redirect('/404');
    }
});

router.get('/:id/complete', async (req, res) => {
    try {
        const task = await getOne(req.params.id);
        task.isCompleted = true;
        task.completor = req.user._id;

        await edit(req.params.id, task);
        res.redirect(`/to-do`);
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