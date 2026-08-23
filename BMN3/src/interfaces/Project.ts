export interface ProjectItemType {
    projectId: string,
    projectName: string,
    personName: string,
    province: string,
    projectDescription: string,
    category: string,
    projectDate: string,
    imageUrl: any
}

export interface ProjectFilter {
    category: string | null,
    province: string | null,
    projectMinDate: string | null,
    projectMaxDate: string | null,
}