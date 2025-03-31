const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const port = 1337;

// Set up Handlebars view engine
app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Home | URI Sailing Team' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About | URI Sailing Team' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact | URI Sailing Team' });
});

app.get('/recruitment', (req, res) => {
  res.render('recruitment', { title: 'Recruitment | URI Sailing Team' });
});

app.get('/roster', (req, res) => {
  res.render('roster', { title: 'Roster | URI Sailing Team' });
});

app.get('/schedule', (req, res) => {
  res.render('schedule', { title: 'Schedule | URI Sailing Team' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { title: '404 - Page Not Found' });
});

// 500 error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { title: '500 - Server Error' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});