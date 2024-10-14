"use client";
import React from 'react'
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer,Bounce,Slide,Flip,Zoom } from 'react-toastify';
export default function ToastNotification() {
  return (
    <ToastContainer
      position='top-right'
      autoClose={1800}
      closeOnClick
      theme='light'
      transition={Slide}
      draggable={true}
      stacked={true}
    />
  )
}
