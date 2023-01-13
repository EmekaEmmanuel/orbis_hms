const Hospital = require('../../models/hospital');
const upload = require('../../middleware/multer');

const routes = function (app) {
  // To login

  // app.get("/hospital/login", async(req, res) =>{
  //  let {email,password} = await Hospital.find(req.body)
  // })

  //To get all hospitals
  app.get('/hospitals', async (req, res) => {
    try {
      let hospitals = await Hospital.find();
      res.json({ message: 'success', data: hospitals });
    } catch (error) {
      res.send('Server error occurs');
    }
  });

  //To get single hospitals
  app.get('/hopitals/:id', async (req, res) => {
    try {
      let hospital = await Hospital.findById(req.params.id);
      res.json({ message: 'success', data: hospital });
    } catch (error) {
      res.send('Server error occurs');
    }
  });
  //To Create Hospital
  app.post('/hospitals', upload.any(), async (req, res) => {
    try {
      let hospital = await new Hospital(req.body);

      req.files.map((e) => {
        switch (e.fieldname) {
          case 'logo':
            newUser.image = e.filename;
            break;
        }
      });
      await hospital.save();

      res.json({
        message: 'Success',
        data: hospital,
      });
    } catch (error) {
      res.status(404);
      res.send(error);
    }
  });
  //To update Hospital details
  app.put('/hospitals/:id', async (req, res) => {
    try {
      let hospital = await Hospital.findById(req.params.id);
      if (!hospital)
        return res.json({ message: 'Hospital does not exist in our records' });

      if (req.body) {
        hospital.overwrite({ ...hospital._doc, ...req.body });

        await hospital.save();

        res.json({
          data: hospital,
          message: 'Hospital details have being updated successfully',
        });
      }
    } catch (error) {
      res.status(404);
      res.send(error);
    }
  });

  //To delete Hospital
  app.delete('/hospitals/:id', async (req, res) => {
    try {
      await Hospital.deleteOne({ _id: req.params.id });
      res.json({ message: 'Hospital has been deleted', code: 200 });
    } catch (error) {
      res.send(404);
      res.send(error);
    }
  });
};

module.exports = routes;
