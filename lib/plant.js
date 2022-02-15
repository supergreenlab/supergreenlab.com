import axios from 'axios'

const API_URL = process.env.API_URL

export async function getPlantById(id) {
  const response = await axios.get(`${API_URL}/public/plant/${id}`, {
    headers: {
    }
  });
  const plant = response.data
  plant.settings = JSON.parse(plant.settings);
  plant.boxSettings = JSON.parse(plant.boxSettings);
  return plant;
}

export async function getFeedEntriesForPlantId(id, limit = 5, offset = 0) {
  const response = await axios.get(`${API_URL}/public/plant/${id}/feedEntries`, {
    params: {limit, offset},
    headers: {
    }
  });
  return  response.data.entries.map(fe => Object.assign(fe, {params: JSON.parse(fe.params || '{}'), meta: JSON.parse(fe.meta || '{}')}));
}

export async function getFeedEntryById(id) {
  const response = await axios.get(`${API_URL}/public/feedEntry/${id}`, {
    headers: {
    }
  });
  return Object.assign(response.data, {params: JSON.parse(response.data.params || '{}'), meta: JSON.parse(response.data.meta || '{}')});
}

export async function getFeedMediasForFeedEntryId(feedEntryId) {
  const response = await axios.get(`${API_URL}/public/feedEntry/${feedEntryId}/feedMedias`, {
    headers: {
    }
  })
  return response.data;
}

export async function getFeedMediaById(feedMediaId) {
  const response = await axios.get(`${API_URL}/public/feedMedia/${feedMediaId}`, {
    headers: {
    }
  })
  return response.data;
}
