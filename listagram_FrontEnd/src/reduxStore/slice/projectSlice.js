import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import {
  ApiPost,
  ApiPostNoAuth,
  formDataHeader,
} from "../../helpers/API/ApiData";
const initialState = {
  project: [],
  focusedProject: {},
  selectedProject: {},
  stats: {},
  userChat: [],
  status: "",
};

export const getAllProject = createAsyncThunk(
  "project/get-my-all",
  async (body) => {
    try {
      const response = await ApiPost(`project/get-my-all`, body);
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const createProject = createAsyncThunk(
  "project/create",
  async (body) => {
    try {
      const response = await ApiPost(`project/create`, body);
      return response;
    } catch (error) {
      return error.response;
    }
  }
);

export const deleteProject = createAsyncThunk(
  "project/delete",
  async (body) => {
    try {
      const response = await ApiPost(`project/delete`, body);
      return response;
    } catch (error) {
      return error.response;
    }
  }
);
export const editProject = createAsyncThunk("project/update", async (body) => {
  try {
    const response = await ApiPost(`project/update`, body);
    return response;
  } catch (error) {
    return error.response;
  }
});
export const createGeneralChat = createAsyncThunk(
  "chat/general_chat",
  async (body) => {
    try {
      const response = await ApiPost(body.route, body);
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const clearChat = createAsyncThunk(
  "chat/clear_pub_chat",
  async (body) => {
    try {
      const response = await ApiPostNoAuth('chat/clear_pub_chat', body);
      return response;
    } catch (error) {
      return error.response;
    }
  }
);
export const updateBrand = createAsyncThunk(
  "project/update-brand",
  async (body) => {
    try {
      const response = await ApiPost(
        `project/update-brand`,
        body,
        formDataHeader
      );
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getStats = createAsyncThunk("project/stats", async (body) => {
  try {
    const response = await ApiPost(`project/stats`, body);
    return response;
  } catch (error) {
    return error;
  }
});
export const getChatUser = createAsyncThunk(
  "chat/get_chat_user",
  async (body) => {
    try {
      const response = await ApiPost(
        `chat/get_chat_user?page=1&limit=10`,
        body
      );
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const getChatByUser = createAsyncThunk(
  "chat/chat-pub-history",
  async (body) => {
    try {
      const response = await ApiPost(`chat/chat-pub-history`, body);
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const getBrandInfo = createAsyncThunk(
  "project/get-brand-info",
  async (body) => {
    try {
      const response = await ApiPost(`project/get-brand-info`, body);
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const changeProjectVisibility = createAsyncThunk(
  "project/change-visibility",
  async (body) => {
    try {
      const response = await ApiPost(`project/change-visibility`, body);
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const initializeChat = createAsyncThunk(
  "chat/initialize_chat",
  async (body) => {
    try {
      const response = await ApiPost(`chat/initialize_chat`, body);
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const refreshApiKey = createAsyncThunk(
  "project/rotate-key",
  async (body) => {
    try {
      const response = await ApiPost(`project/rotate-key`, body);
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const projectSlice = createSlice({
  name: "project",
  initialState: initialState,
  reducers: {
    setFocusedProject: (state, action) => {
      state.focusedProject = action.payload;
    },
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProject.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.project = action?.payload?.data;
      })
      .addCase(getAllProject.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(createProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { project } = current(state);
        state.project = [...(project?.length > 0 ? project : []),action?.payload?.data?.data];
      })
      .addCase(createProject.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(editProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editProject.fulfilled, (state, action) => {
        if(!action?.payload?.data?.success) return;
        state.status = "succeeded";
        const { project } = current(state);
        state.project = project.map((item)=>item?.id===action?.payload?.data?.data?.id?action?.payload?.data?.data:item);
      })
      .addCase(editProject.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(deleteProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { project } = current(state);
        state.project=project.filter((item)=>item.id!==action?.payload?.data?.data?.id)
      })
      .addCase(deleteProject.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(createGeneralChat.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createGeneralChat.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(createGeneralChat.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(updateBrand.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { project } = current(state);
        let value = [...project];
        value = value.map((item) =>
          item.id === action.payload?.data?.data?.id
            ? action.payload?.data?.data
            : item
        );
        state.project = value;
        state.focusedProject = action.payload?.data?.data;
        state.selectedProject = action.payload?.data?.data;
      })
      .addCase(updateBrand.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(getStats.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStats.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload?.status !== 200) return;
        state.stats = action.payload?.data?.data;
      })
      .addCase(getStats.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(getChatUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getChatUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload?.status !== 200) return;
        state.userChat = action?.payload?.data?.data;
      })
      .addCase(getChatUser.rejected, (state) => {
        state.status = "rejected";
      }) 
      .addCase(refreshApiKey.pending, (state) => {
        state.status = "loading";
      })
      .addCase(refreshApiKey.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload?.status !== 200) return;
        // state.userChat = action?.payload?.data?.data;
        state.focusedProject=action?.payload?.data?.data
        state.selectedProject=action?.payload?.data?.data
      })
      .addCase(refreshApiKey.rejected, (state) => {
        state.status = "rejected";
      })
  },
});
export const { setFocusedProject, setSelectedProject } = projectSlice.actions;
export default projectSlice;
