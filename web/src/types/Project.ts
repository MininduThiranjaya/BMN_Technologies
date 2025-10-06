export interface ProjectItemType {
    projectId: string,
    projectName: string,
    personName: string,
    location: string,
    projectDescription: string,
    category: string,
    projectDate: string,
    imageUrl: any
}

export interface ProjectFilter {
    category: string | null,
    location: string | null,
    projectMinDate: string | null,
    projectMaxDate: string | null,
}