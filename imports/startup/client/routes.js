import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/concepts/concepts.js';
import '../../ui/pages/admin/admin.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_home' });
  },
});
FlowRouter.route('/concepts', {
  name: 'Concepts.index',
  action() {
    BlazeLayout.render('App_body', { main: 'Concepts_index' });
  },
});
FlowRouter.route('/admin', {
  name: 'App.admin',
  action() {
    BlazeLayout.render('App_body', { main: 'admin' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
