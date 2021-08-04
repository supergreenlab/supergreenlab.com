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

// this could maybe go into a separate service file for /feedEntry but to keep it simple, it's here for now.
export async function getFeedMediasByFeedEntryId(feedEntryId) {
    const response = await axios.get(`https://api2.supergreenlab.com/public/feedEntry/${feedEntryId}/feedMedias`)
    return response.data;
}

// https://api2.supergreenlab.com/public/plant/$id
// https://api2.supergreenlab.com/public/plant/$id/feedEntries?limit=$n&offset=$offset
// https://api2.supergreenlab.com/public/feedEntry/$id/feedMedias
