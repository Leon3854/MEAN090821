const express = require('express');
const authRoutes = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics');
const categoryRoutes = require('./routes/category');
const orderPoutes = require('./routes/order');
const positionRoutes = require('./routes/position');

const app = express();


app.use('/api/auth', authRoutes);
app.use('api/analytics', analyticsRoutes);
app.use('/api/category', categoryRoutes);
app.use('/app/order', orderPoutes);
app.use('/app/position', positionRoutes);


module.exports = app