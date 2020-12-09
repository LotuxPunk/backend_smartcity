const ApartmentController = require("../controller/apartment");
const Router = require("express-promise-router");
const multer = require('multer');
const shortid = require("shortid");
const mime = require("mime-types");

const { identification } = require("../middleware/Identification");
const { mustBeOwner } = require("../middleware/Authorization");
const router = new Router;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename : (req, file, cb) => {
        let id = shortid.generate();
        let ext = mime.extension(file.mimetype);
        cb(null, `${id}.${ext}`);
    }
})
const upload = multer({ 
    mimetype : /^image/,
    storage:storage
});

router.get("/", identification, mustBeOwner, ApartmentController.getApartments);
router.post("/", identification, mustBeOwner, upload.single("image"), ApartmentController.addApartment);

module.exports = router;