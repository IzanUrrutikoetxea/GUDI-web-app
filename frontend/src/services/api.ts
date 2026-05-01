const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
}

const parseResponse = async (response: Response) => {
    const contentType = response.headers.get('content-type')

    if (!contentType?.includes('application/json')) {
        return null
    }

    return response.json()
}

const getAuthHeaders = (): HeadersInit => {
    const token = localStorage.getItem('token')

    if (!token) {
        return defaultHeaders
    }

    return {
        ...defaultHeaders,
        Authorization: `Bearer ${token}`,
    }
}

export const apiGet = async <T,>(url: string): Promise<T> => {
    const response = await fetch(`${API_URL}${url}`, {
        headers: getAuthHeaders(),
    })

    const data = await parseResponse(response)

    if (response.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
        throw new Error('Unauthorized')
    }

    if (!response.ok) {
        throw new Error(data?.message || 'Request failed')
    }

    return data as T
}

export const apiPost = async <T,>(url: string, body: unknown): Promise<T> => {
    const response = await fetch(`${API_URL}${url}`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(body),
    })

    const data = await parseResponse(response)

    if (!response.ok) {
        throw new Error(data?.message || 'Request failed')
    }

    return data as T
}