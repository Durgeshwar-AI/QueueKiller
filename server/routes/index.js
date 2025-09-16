import schedule from './schedule.route.js'

export default function routing(app){
    app.use('/api/schedule', schedule)
}