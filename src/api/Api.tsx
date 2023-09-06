import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://3d-backend-two.vercel.app/'
})

type GetConeParamsProps = {
    height: number;
    radius: number;
    segments: number;
}

export const api = {
    getConeTriangulation(params: GetConeParamsProps) {
        return instance.post('cone/triangulate', params)
    }
};

