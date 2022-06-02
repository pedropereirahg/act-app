import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  isLoading: true,
};

async function getData() {
  const response = '';
  await fetch('https://act-api-dev-r5khawnfbq-uc.a.run.app/activities', {
    method: 'GET',
    headers: {
      'accept': 'application/json'
    }
  })
    .then(res => res.json())
    .then(result => response = result.data)
    .catch(error => console.log(error))
}

export const getQuestion = createAsyncThunk(
  'data',
  getData()
);

const QuestionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
  },
});

export default QuestionSlice.reducer;
