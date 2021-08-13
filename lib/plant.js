/*
 * Copyright (C) 2020  SuperGreenLab <towelie@supergreenlab.com>
 * Author: Constantin Clauzel <constantin.clauzel@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
