const router = require('express').Router();
const { getAll, getAllCompleted, getAllToDo, getMine, create, getOne, remove, complete } = require('../services/taskService');
const { getUserById } = require('../services/authService');
// const { showDeleteMsg } = require('../js/app');

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
    const myTasks = await getMine(req.query.search, req.user._id);
    res.render('taskPageMine', { myTasks });
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Task' });
});

router.post('/create', async (req, res) => {
    if (!req.body) throw new Error({ message: 'Content is required' });
    console.log(req.body);
    const task = req.body;
    task.creator = req.user._id;
    task.isCompleted = false;
    task.completor = '';
    console.log(task);

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
        let creator = await getUserById(task.creator);

        task.userCreated = creator.username;

        let createdAt = task.created_at;
        let timeCreated = createdAt.toString().split(' ');
        task.dateCreated = `${timeCreated[2]} ${timeCreated[1]} ${timeCreated[3]}`;
        task.hourCreated = timeCreated[4].slice(0, 5);

        if (task.completor) {
            let completor = await getUserById(task.completor);
            
            task.userCompleted = completor.username;

            let completedAt = task.updated_at;
            let timeCompleted = completedAt.toString().split(' ');

            task.dateCompleted = `${timeCompleted[2]} ${timeCompleted[1]} ${timeCompleted[3]}`;
            task.hourCompleted = timeCompleted[4].slice(0, 5);
        }

        res.render('details', { task });

    } catch (error) {
        res.redirect('/404');
    }
});

router.get('/:id/complete', async (req, res) => {
    try {
        await complete(req.params.id, req.user._id);
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