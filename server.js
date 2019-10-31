const {express, bodyParser, cors, db} = require('./libraries');
const router = require('./routes/routes');

// Connecting to database:
db.sequelize.sync();
// add sync({force: true}) to drop tables and create new forcefully.

const app = express();

const port = 8000;

app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
