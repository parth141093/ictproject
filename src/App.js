import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SimpleFeedbackForm from './components/SimpleFeedbackForm/SimpleFeedbackForm';
import FeedbackForm_Step2 from './components/FeedbackForm_Step2';
import DetailFeedbackForm from './components/DetailFeedbackForm/DetailFeedbackForm';
import Login from './components/Login';
import AdminLayout from './admin/AdminLayout';
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<Login />} />
        <Route path="/feedback-2" element={<FeedbackForm_Step2 />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/simple-feedback-form" element={<SimpleFeedbackForm />} />
        <Route path="/detail-feedback-form" element={<DetailFeedbackForm />} />
      </Routes>
    </Router>
  );
};

export default App;
