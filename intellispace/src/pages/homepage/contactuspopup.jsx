import React, { useState, useRef, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import emailjs from "emailjs-com";

export default function ContactUsModal({ show, setShow }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const form = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        emailjs.sendForm(
            "service_50xsf8d",
            "template_ziys0h8",
            form.current,
            "SxdeFlZArqjSkFMpF"
        )
        .then(
            (result) => {
                console.log(result.text);
                console.log("message sent");
                setName("");
                setEmail("");
                setMessage("");
                setShow(false); 
            },
            (error) => {
                console.log(error.text);
            }
        );
    };

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Contact Us</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} ref={form}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            required
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email address"
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formMessage">
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter Message"
                            required
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary mt-3" className="SubmitButton" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
