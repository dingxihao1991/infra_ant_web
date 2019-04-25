import React, { PureComponent } from 'react';

import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import { connect } from 'dva';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = BigCalendar.momentLocalizer(moment)

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

let allViews = Object.keys(BigCalendar.views).map(k => BigCalendar.views[k])

const events = [
    {
        id: "402888c666d8b8870166d8c581cc0028",
        sys_Date: null,
        lastModifiedDate: null,
        markAsDeleted: false,
        title: "预警派单",
        desc: "预警派单",
        start: new Date(),
        end: new Date(),
        grade: "其它",
        remindTime: "2018-11-22 00:00:00",
        status: null,
        collaborator: null,
        tags: null,
        principal: null,
        calendarId: "402888c666d8b8870166d8c581cc0028"
    },
    {
        id: "402888c666d8b8870166d8c396930026",
        sys_Date: null,
        lastModifiedDate: null,
        markAsDeleted: false,
        title: "预警派单",
        desc: "null",
        start: "2019-04-23 00:00:00",
        end: "2019-04-24 00:00:00",
        grade: "其它",
        remindTime: "2019-04-24 00:00:00",
        status: null,
        collaborator: null,
        tags: null,
        principal: null,
        calendarId: "402888c666d8b8870166d8c396930026"
    },
    {
        id: "402888c666d8b8870166d8c313f00022",
        sys_Date: null,
        lastModifiedDate: null,
        markAsDeleted: false,
        title: "日常巡检",
        desc: "电力巡检",
        start: "2018-11-09 00:00:00",
        end: "2018-11-09 20:00:00",
        grade: "巡检",
        remindTime: "2018-11-09 00:00:00",
        status: null,
        collaborator: null,
        tags: null,
        principal: null,
        calendarId: "402888c666d8b8870166d8c313f00022"
    },
    {
        id: "402888c666d8b8870166d8c313d6001f",
        sys_Date: null,
        lastModifiedDate: null,
        markAsDeleted: false,
        title: "日常巡检",
        desc: "电力巡检",
        start: "2018-11-08 00:00:00",
        end: "2018-11-08 20:00:00",
        grade: "巡检",
        remindTime: "2018-11-08 00:00:00",
        status: null,
        collaborator: null,
        tags: null,
        principal: null,
        calendarId: "402888c666d8b8870166d8c313d6001f"
    },
    {
        id: "402888c666d8b8870166d8c313bd001c",
        sys_Date: null,
        lastModifiedDate: null,
        markAsDeleted: false,
        title: "日常巡检",
        desc: "电力巡检",
        start: "2018-11-07 00:00:00",
        end: "2018-11-07 20:00:00",
        grade: "巡检",
        remindTime: "2018-11-07 00:00:00",
        status: null,
        collaborator: null,
        tags: null,
        principal: null,
        calendarId: "402888c666d8b8870166d8c313bd001c"
    },
    {
        id: "402888c666d8b8870166d8c313a70019",
        sys_Date: null,
        lastModifiedDate: null,
        markAsDeleted: false,
        title: "日常巡检",
        desc: "电力巡检",
        start: "2018-11-06 00:00:00",
        end: "2018-11-06 20:00:00",
        grade: "巡检",
        remindTime: "2018-11-06 00:00:00",
        status: null,
        collaborator: null,
        tags: null,
        principal: null,
        calendarId: "402888c666d8b8870166d8c313a70019"
    },
    {
        id: "402888c666d8b8870166d8c3139e0017",
        sys_Date: null,
        lastModifiedDate: null,
        markAsDeleted: false,
        title: "每周固定巡检",
        desc: "每周固定巡检",
        start: "2018-11-05 14:30:00",
        end: "2018-11-05 20:00:00",
        grade: "巡检",
        remindTime: "2018-11-05 14:30:00",
        status: null,
        collaborator: null,
        tags: null,
        principal: null,
        calendarId: "402888c666d8b8870166d8c3139e0017"
    },
    {
        id: "402888c666d8b8870166d8c313880014",
        sys_Date: null,
        lastModifiedDate: null,
        markAsDeleted: false,
        title: "日常巡检",
        desc: "电力巡检",
        start: "2018-11-05 00:00:00",
        end: "2018-11-05 20:00:00",
        grade: "巡检",
        remindTime: "2018-11-05 00:00:00",
        status: null,
        collaborator: null,
        tags: null,
        principal: null,
        calendarId: "402888c666d8b8870166d8c313880014"
    },
    {
        id: "402888c666d8b8870166d8c313720011",
        sys_Date: null,
        lastModifiedDate: null,
        markAsDeleted: false,
        title: "日常巡检",
        desc: "电力巡检",
        start: "2018-11-04 00:00:00",
        end: "2018-11-04 20:00:00",
        grade: "巡检",
        remindTime: "2018-11-04 00:00:00",
        status: null,
        collaborator: null,
        tags: null,
        principal: null,
        calendarId: "402888c666d8b8870166d8c313720011"
    },
    {
        id: "402888c666d8b8870166d8c3134d000e",
        sys_Date: null,
        lastModifiedDate: null,
        markAsDeleted: false,
        title: "日常巡检",
        desc: "电力巡检",
        start: "2018-11-03 00:00:00",
        end: "2018-11-03 20:00:00",
        grade: "巡检",
        remindTime: "2018-11-03 00:00:00",
        status: null,
        collaborator: null,
        tags: null,
        principal: null,
        calendarId: "402888c666d8b8870166d8c3134d000e"
    },
    {
        id: "402888c666d8b8870166d8c02dea0009",
        sys_Date: null,
        lastModifiedDate: null,
        markAsDeleted: false,
        title: "预警派单",
        desc: "预警警告",
        start:  new Date(2018, 12, 6),
        end: "2018-11-03 00:00:00",
        grade: "其它",
        remindTime: "2018-11-03 00:00:00",
        status: null,
        collaborator: null,
        tags: null,
        principal: null,
        calendarId: "402888c666d8b8870166d8c02dea0009"
    }
]

@connect(({loading, personalCentre}) => ({
    calendarList:personalCentre.calendarList,
}))
class WorkingCalendar extends PureComponent{

    state = {
        events: events,
        culture: 'zh-CN'
    }

    navigate = (date, action) => {
        var that = this;
        console.log("-------刷新",date, action)
    }

    SelectSlot = (slotInfo) => {
        console.log("SelectSlot--",slotInfo)
        return false;
    }

    moveCalendarEvent = ({event, start, end}) => {

        return false;

    }

    eventStyleGetter = (event, start, end, isSelected) => {
        event.start = new Date(start);
        event.end = new Date(end);

        var backgroundColor = '';
        if (event.grade == "巡检") {
            backgroundColor = '#4fbdff';
        } else if (event.grade == "养护") {
            backgroundColor = '#02c442';
        } else if (event.grade == "其它") {
            backgroundColor = '#FFA825';
        }
        else {
            backgroundColor = '#C4210E';
        }
        var style = {
            backgroundColor: backgroundColor
        };
        return {
            style: style
        };
    }


    onSelectListNav = (e) => {
        var grade = e.target.innerText;
        //this.getCalendarData(grade);

    }

    SelectEvent = (event) => {
        let grade = event.grade;
        console.log(grade);


    }

    render(){
        const {events,culture} = this.state;

        const {calendarList} =this.props;

        return(
            <div style={DefaultPanel}>

                <div style={ContentPanel}>
                    <div style={CalendarPanel}>
                        <DragAndDropCalendar
                            selectable
                            events={calendarList}
                            defaultView='month'
                            culture={culture}
                            views={allViews}
                            onNavigate={this.navigate}
                            onSelectEvent={event => this.SelectEvent(event)}
                            onEventDrop={this.moveCalendarEvent.bind(this)}
                            onSelectSlot={this.SelectSlot.bind(this)}
                            eventPropGetter={this.eventStyleGetter.bind(this)}
                            defaultDate={new Date()}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
export default WorkingCalendar

const DefaultPanel = {
    width: '100%',
    height: '100%',
}

const ContentPanel = {
    display: 'inline-block',
    width: '100%',
    height: '95%',
    padding: '15px'
}


const CalendarPanel = {
    height: '600px',
    flexDirection: 'column',
    width: '100%',
    background: '#FAFAFA',
    fontSize: '16px',
    fontWeight:'bold'
}

