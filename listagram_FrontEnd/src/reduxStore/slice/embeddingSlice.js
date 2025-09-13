import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import {  ApiPost } from "../../helpers/API/ApiData";

const initialState = {
    embeddingFile:[]
};


export const addFileUpload = createAsyncThunk("embedding/file-upload", async (body) => {
  try {
    const response = await ApiPost(body?.route, body?.data,body?.headers);
    return response;
  } catch (error) {
    return error;
  }
});

export const getUploadedFile = createAsyncThunk("embedding/list-by-project", async (body) => {
  try {
    const response = await ApiPost(`embedding/list-by-project`,body);
    return response;
  } catch (error) {
    return error;
  }
});
export const deleteFile = createAsyncThunk("embedding/delete", async (body) => {
  try {
    const response = await ApiPost(`embedding/delete`,body);
    return response;
  } catch (error) {
    return error;
  }
});

export const embeddingSlice = createSlice({
  name: "embedding",
  initialState: initialState,

  extraReducers(builder) {
    builder
    .addCase(addFileUpload.pending, (state) => {
      state.status = "loading";

    })
    .addCase(addFileUpload.fulfilled, (state, action) => {
      state.status = "succeeded";
      const currentState=current(state)
      if(!action?.payload?.data?.success){
        return;
      }
      state.embeddingFile=[action?.payload?.data?.data,...(currentState?.embeddingFile?.length>0?currentState?.embeddingFile:[])]
 
    })
    .addCase(addFileUpload.rejected, (state) => {
      state.status = "rejected";
    
    })
      .addCase(getUploadedFile.pending, (state) => {
        state.status = "loading";

      })
      .addCase(getUploadedFile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.embeddingFile=action?.payload?.data?.data
   
      })
      .addCase(getUploadedFile.rejected, (state) => {
        state.status = "rejected";
      
      })
      .addCase(deleteFile.pending, (state) => {
        state.status = "loading";

      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        if(!action?.payload?.data?.success){
          return;
        }
        state.status = "succeeded";
        const currentState=current(state)
        let embeddedData=currentState?.embeddingFile?.filter((item)=>item.id!==action?.payload?.data?.data?.id)

        state.embeddingFile=embeddedData
   
      })
      .addCase(deleteFile.rejected, (state) => {
        state.status = "rejected";
      
      })
  },
});
export default embeddingSlice;
