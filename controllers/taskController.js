const router = require('express').Router();
const { getAll, create, getOne, remove } = require('../services/taskService');

router.get('/', async (req, res) => {
    const tasks = await getAll(req.query.search);
    res.render('taskPage', { tasks });
});


router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Task' });
});

router.post('/create', async (req, res) => {
    if (!req.body) throw new Error({ message: 'Content is required' });

    let { content } = req.body;

    const data = { content }

    console.log(data);

    try {
        await create(data, req.user._id);
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

router.get('/:id/delete', async (req, res) => {
    try {
        await remove(req.params.id);
        res.redirect('/');
    } catch (error) {
        res.redirect('/error-page');
    }
});

router.all('*', (req, res) => {
    res.render('404', { title: 'Page Not Found' });
});

module.exports = router;