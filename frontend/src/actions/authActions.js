import { createAsyncThunk } from "@reduxjs/toolkit";

// Getting all products
export const loginUser = createAsyncThunk("login", async (body) => {
    const res = await fetch("http://localhost:5000/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  });

  export const registerUser = createAsyncThunk("register", async (body) => {
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  });