import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FeedbackForm from './components/FeedbackForm/FeedbackForm';
import FeedbackForm_Step2 from './components/FeedbackForm_Step2';
import HelloWorld from './components/HelloWord';
import AdminView from './components/AdminView';
import DetailFeedbackForm from './components/DetailFeedbackForm/DetailFeedbackForm';
import Login from './components/Login';
import EditQuestion from './components/EditQuestion';
import AddQqestion from './components/AddQuestion';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<Login />} />
        {/* <Route path="/feedback" element={<FeedbackForm />} /> */}
        <Route path="/feedback-2" element={<FeedbackForm_Step2 />} />
        <Route path="/hello" element={<HelloWorld />} />
        <Route path="/admin" element={<AdminView />} />
        {/* <Route path="/detail" element={<DetailFeedbackForm />} /> */}
        <Route path="/simple-feedback-form" element={<FeedbackForm />} />
        <Route path="/detail-feedback-form" element={<DetailFeedbackForm />} />
        <Route path="/add" element={<AddQqestion />} />
        <Route path="/edit/:id" element={<EditQuestion />} />
      </Routes>
    </Router>
  );
};

export default App;
