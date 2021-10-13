enum STATUSES {
    'OPEN',
    'CLOSE',
    'DELETED'
}

interface externalLinks {
    article_id: string,
    link: string,
    text: string,
};

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
    scheduled_for: Date,
    opened_on: Date,
    closed_on: Date,

    meta: [meta],
	comments: [comments],
	tags: [],

    externalLinks: [externalLinks],

	status: STATUSES,

    deletedAt: Date,
    createdAt: Date,
    updatedAt: Date,
}
