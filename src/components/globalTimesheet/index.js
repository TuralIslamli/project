import React, { useEffect, useState } from "react";
import { ListItemText, ListItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getGlobalTimesheetData } from "../../modules/redux/generateTimesheet/selectors";
import { setGlobalTimesheet } from "../../modules/saga/generateTimesheet/actions";
import { globalTimesheetStyles } from "./styles";


const GlobalTimeSheetList = () => {
    const dispatch = useDispatch();
    const globalTimeSheetResult = useSelector(getGlobalTimesheetData);

    const [search, setSearch] = useState("");
    const searchDescribe = (event) => {
        setSearch(event.target.value);
    };
    useEffect(() => {
        dispatch(setGlobalTimesheet());
    }, []);

    const messageOutput = (message) => {
        switch (message) {
            case "timesheet approved":
                return "impossible to generate timesheet, timesheet had already been approved";
            case "Not found":
                return "empty list";
            default:
                return message;
        }
    };

    return (
        <div style={{ display: 'flex', margin: 50, flexDirection: 'column', width: 500 }}>
            <input style={globalTimesheetStyles.searchInput} className="searchInput" onChange={searchDescribe} value={search} placeholder="Search user name..."></input>
            {
                globalTimeSheetResult?.filter((item) => {
                    if (search === "") {
                        return item;
                    } else if (item.firstname_lastname.toLowerCase().includes(search.toLowerCase())) {
                        return item;
                    }
                }).map((item, index) => {
                    return (
                        <ListItem
                            key={index}
                            style={{ flexDirection: 'column', alignItems: 'flex-start' }}
                            disableGutters>
                            <ListItemText primary={item.firstname_lastname} />
                            <ListItemText style={{ color: item.error ? "red" : "green" }} primary={messageOutput(item.message)} />
                        </ListItem>
                    );
                })

            }
        </div>
    );
};

export default GlobalTimeSheetList;