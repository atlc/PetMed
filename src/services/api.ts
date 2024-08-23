import LS from "./LS";
import alerts from "./alerts";

type SUPPORTED_METHODS = "GET" | "POST" | "PUT" | "DELETE";

export const fetcher = <T = any>(url: string, method: SUPPORTED_METHODS = "GET", raw_data?: any, is_json: boolean = true) => {
    const headers: HeadersInit = {};

    const options: RequestInit = { method, headers };

    if (raw_data && is_json && (method === "POST" || method === "PUT")) {
        headers["Content-Type"] = "application/json";
        options["body"] = JSON.stringify(raw_data);
    }

    // Here, we are assuming that almost all of the data sent will be JSON for this app with the exception of
    // file uploads, which we will send as FormData
    if (raw_data && !is_json && (method === "POST" || method === "PUT")) {
        const data = new FormData();
        data.append("upload", raw_data);
        options["body"] = data;
    }

    const token = LS.tokens.get();

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const server_preface = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";
    const full_url = server_preface + url;

    console.log({
        fetchData: {
            full_url,
            options,
        },
    });

    return new Promise<T>(async (resolve) => {
        try {
            const res = await fetch(full_url, options);
            const data = await res.json();

            if (res.ok) {
                resolve(data);
            } else {
                alerts.error(data.message || "An unexpected error occurred when talking to the server, please try again later");
                console.error(data);
            }
        } catch (error) {
            if (error instanceof Error) {
                alerts.error(error.message);
            }
            console.error(error);
        }
    });
};

export const GET = <T = any>(url: string) => fetcher<T>(url);
export const POST = <T = any>(url: string, data: any, is_json: boolean = true) => fetcher<T>(url, "POST", data, is_json);
export const PUT = <T = any>(url: string, data: any, is_json: boolean = true) => fetcher<T>(url, "PUT", data, is_json);
export const DELETE = <T = any>(url: string) => fetcher<T>(url, "DELETE");
