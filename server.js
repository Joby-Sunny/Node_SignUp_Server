const {express, bodyParser, cors} = require('./libraries');
const router = require('./routes/routes');

const app = express();

const port = 8000;

app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
