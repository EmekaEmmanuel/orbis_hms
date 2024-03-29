const Branch = require('../../models/branch');

const routes = function (app) {
  //To get all branches in the system
  app.get('/branch', async (req, res) => {
    try {
      let branches = await Branch.find();
      res.json({ message: 'success', data: branches });
    } catch (error) {
      res.send({ error, msg: 'Server error occurs' });
    }
  });

  // To get a single branch


  //To  get single branch
  app.get('/branch/:id', async (req, res) => {
    try {
      let branch = await Branch.findById(req.params.id);
      res.json({ data:branch, message: 'Successful' });
    } catch (error) {
      console.log(error);
      res.send('Server error occors');
    }
  });
  //To Post branch
  app.post('/branch', async (req, res) => {
    try {

      let branch = await new Branch(req.body);

      await branch.save();

      res.json({ 
        message: 'Branch created', data:branch 
      });
    } catch (error) {
      res.status(404);
      res.send(error);
    }
  });
  //To update branch details
  app.put('/branch/:id', async (req, res) => {
    try {
      let branch = await Branch.findById(req.params.id );
      if (!branch)
        return res.json({ message: 'Branch does not exist in our records' });

      if (req.body) {

        branch.overwrite({ ...branch._doc, ...req.body });

        await branch.save();

        res.json({
          message: 'Branch details have being updated successfully',
          data: branch,
        });
      }
    } catch (error) {
      res.status(404);
      res.send(error);
    }
  });
  //To delete branch
  app.delete('/branch/:id', async (req, res) => {
    try {

      await Branch.deleteOne({ _id: req.params.id });

      res.json({ message: 'Branch has been deleted', code: 200 });

    } catch (error) {
      res.status(404);
      res.send(error);
    }
  });
};

module.exports = routes;
