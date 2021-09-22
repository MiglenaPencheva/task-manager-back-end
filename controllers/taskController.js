const router = require('express').Router();
const { getAll, getAllCompleted, getAllToDo, getMine, create, getOne, remove, complete } = require('../services/taskService');
const { getUserById } = require('../services/authService');

router.get('/all', async (req, res) => {
    const tasks = await getAll(req.query.search);
    let formatedTasks = tasks.map(x => formatDate(x));
    let isOne = formatedTasks.length == 1 ? true : false;
    res.render('taskPageAll', { formatedTasks, isOne });
});

router.get('/archive', async (req, res) => {
    const completed = await getAllCompleted(req.query.search);
    let formatedCompleted = completed.map(x => formatDate(x));
    let isOne = formatedCompleted.length == 1 ? true : false;
    res.render('taskPageArchive', { formatedCompleted, isOne });
});

router.get('/to-do', async (req, res) => {
    const toDoList = await getAllToDo(req.query.search);
    let formatedToDoList = toDoList.map(x => formatDate(x));
    let isOne = formatedToDoList.length == 1 ? true : false;
    res.render('taskPageToDo', { formatedToDoList, isOne });
});

router.get('/my-tasks', async (req, res) => {
    const myTasks = await getMine(req.query.search, req.user._id);
    let formatedMyTasks = myTasks.map(x => formatDate(x));
    let isOne = formatedMyTasks.length == 1 ? true : false;
    res.render('taskPageMine', { formatedMyTasks, isOne });
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Task' });
});

router.post('/create', async (req, res) => {

    try {
        const task = req.body;
        if (task.content.trim() === '') throw {message: 'Попълни съдържание!'};
        task.creator = req.user._id;
        task.isCompleted = false;
        task.completor = '';

        await create(task);
        res.redirect('/tasks/to-do');

    } catch (error) {
        res.render('create', { error });
    }
});

router.get('/:id/details', async (req, res) => {
    try {
        let task = await getOne(req.params.id);
        formatDate(task);

        let creator = await getUserById(task.creator);
        formatCreator(task, creator);

        if (task.completor) {
            let completor = await getUserById(task.completor);
            formatCompletor(task, completor);
        }

        res.render('details', { task });

    } catch (error) {
        res.redirect('/404');
    }
});

router.get('/:id/complete', async (req, res) => {
    try {
        await complete(req.params.id, req.user._id);
        res.redirect('/tasks/to-do');
    } catch (error) {
        res.redirect('/404');
        // res.render('create', "Нещо се обърка...");
    }
});

router.get('/:id/delete', async (req, res) => {
    try {
        await remove(req.params.id);
        res.redirect('/tasks/to-do');
    } catch (error) {
        res.redirect('/404');
    }
});

router.all('*', (req, res) => {
    res.render('404', { title: 'Page Not Found' });
});

module.exports = router;

const monts = {
    'Jan': 'ян',
    'Feb': 'февр',
    'Mar': 'март',
    'Apr': 'апр',
    'May': 'май',
    'Jun': 'юни',
    'Jul': 'юли',
    'Aug': 'авг',
    'Sep': 'септ',
    'Oct': 'окт',
    'Nov': 'ное',
    'Dec': 'дек',
};

function formatDate(task) {
    let createdAt = task.created_at;
    let timeCreated = createdAt.toString().split(' ');

    let day = timeCreated[2];
    let month = monts[timeCreated[1]];
    let year = timeCreated[3];

    task.dateCreated = `${day} ${month} ${year}`;

    let hour = timeCreated[4];
    task.hourCreated = hour.slice(0, 5);

    if (task.updated_at) {
        let completedAt = task.updated_at;
        let timeCompleted = completedAt.toString().split(' ');

        let dayC = timeCompleted[2];
        let monthC = monts[timeCompleted[1]];
        let yearC = timeCompleted[3];
        task.dateCompleted = `${dayC} ${monthC} ${yearC}`;

        let hourC = timeCompleted[4];
        task.hourCompleted = hourC.slice(0, 5);
    }

    return task;
}

function formatCreator(task, creator) {
    task.userCreated = creator.username;
    return task;
}

function formatCompletor(task, completor) {
    task.userCompleted = completor.username;
    return task;
}