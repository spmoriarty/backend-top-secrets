
const pool = require('../utils/pool');

class = Secret {

    id;
    title;
    description;
    created_at;

    constructor ({ rows }) {
        this.id = row.id;
        this.title = row.title;
        this.description = row.description;
        this.created_at = row.created_at;
    }
}