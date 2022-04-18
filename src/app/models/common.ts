export interface PaginationData {
    offset?: number;
    limit?: number;
    like?: string;
}

export interface PaginationResponse {
    count: number;
    rows: any[];
}
