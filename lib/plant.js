import axios from 'axios'

const basePath = 'https://api2.supergreenlab.com/public/plant';

export function test() {
    console.log('test called');
}

export async function getPlantById(id) {
    const response = await axios.get(`${basePath}/${id}`);
    return  response.data;
}

export async function getFeedEntriesById(id, limit = 5, offset = 0) {
    const response = await axios.get(`${basePath}/${id}/feedEntries`, {params: {limit, offset}});
    return  response.data;
}

// https://api2.supergreenlab.com/public/plant/$id
// https://api2.supergreenlab.com/public/plant/$id/feedEntries?limit=$n&offset=$offset
// https://api2.supergreenlab.com/public/feedEntry/$id/feedMedias
