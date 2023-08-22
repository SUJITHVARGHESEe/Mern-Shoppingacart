import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { updateProfile } from "../Action/UserAction";
import { toast } from "react-toastify";
import { getError } from "../utils";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!name || !email || (!oldPassword && newPassword)) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const result = await dispatch(
        updateProfile(name, email, oldPassword, newPassword, user._id)
      );
      toast.success("Profile Updated");
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="oldPassword">
        <Form.Label>Old Password</Form.Label>
        <Form.Control
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="newPassword">
        <Form.Label>New Password</Form.Label>
        <Form.Control
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </Form.Group>
      <Button type="submit">Update Profile</Button>
    </Form>
  );
};

export default UserProfilePage;
