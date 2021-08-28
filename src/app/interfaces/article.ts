enum STATUSES {
    'OPEN',
    'CLOSE',
    'DELETED'
}

interface meta {
    article_id: string,
    name: string,
    content: string,
    status: STATUSES,
    
    deletedAt: Date,
    createdAt: Date,
    updatedAt: Date,
}

interface comments {
    article_id: string,
    name: string,
    comment: string,
    status: STATUSES,
    
    deletedAt: Date,
    createdAt: Date,
    updatedAt: Date,
}

export interface Article {
    user_id: string,
    department_id: string,
    category_id: string,

    title: string,
    slug: string,

    short_description: string,
    description: string,

    meta: [meta],
	comments: [comments],
	tags: [],

	status: STATUSES,

    deletedAt: Date,
    createdAt: Date,
    updatedAt: Date,
}
