
// sorting the logs by name, rating, date??? 

        // // sorted log titles below: 
        // let getLogTitles = (logs) => {
        //     let logTitles = [];
        //     for (let i = 0, max = logs.length; i < max; i++) {
        //         logTitles.push(logs[i].title);
        //         // console.log(logTitles);
        //     }
        //     return logTitles;
        // }
        // let logTitles = getLogTitles(logs);

        // let sortedLogTitles = logTitles.sort((a, b) => {
        //     if (a < b) return -1;
        //     else if (a > b) return 1;
        //     return 0;
        // });
        // // console.log(sortedLogTitles);
        
        // const getLogSorted = (logs=[], sortedLogTitles) => {  // returns an array of the logs sorted by name !!
        //     let sortedTitleLogs = [];
        //     for(let i = 0, max = sortedLogTitles.length; i < max; i++) {
        //         if (!sortedLogTitles[i]) {
        //             return logs;
        //         } else {
        //             sortedTitleLogs.push(logs.filter(log => log.title === sortedLogTitles[i]));
        //             // console.log(sortedLogs);
        //         }
        //     }
        //     return sortedTitleLogs;
        // }
        // let tempSortedTitleLogs = getLogSorted(logs, sortedLogTitles);
        
        // // flatten array of array into array of objects:
        // let logsSortedByTitle = [].concat.apply([], tempSortedTitleLogs);
        // console.log(logsSortedByTitle);

        // // render of logs sorted by title:
        // const logsSortedTitleMapped = logsSortedByTitle.map(log => 
        //     <ALog key={log.id}
        //     id={log.id}
        //     title={log.title}
        //     info={log.info}
        //     ordered={log.ordered}
        //     rating={log.rating}
        //     date={log.date}
        //     eatery={getEateriesForLog(eateries, log.eatery_id)}
        //     />
        // );

// sorted eatery names:
        // console.log(eateryNames[0].id);
        // let sortedEateryNames = eateryNames.sort((a, b) => (a.name > b.name) ? 1: -1);
        // console.log(logs);

        // console.log(sortedEateryNames);
        // returns array of eatery names sorted alphabetically ^

        // render() {
            
        // figure out sort ???  ??? 

        // const sortby = 
        // (
        //     <div className="sortby">
        //         <select name="sortby">
        //             <option value="sort-default">Sort by Title</option>
        //             <option value="eatery">Sort by Eatery</option>
        //             <option value="rating">Sort by Rating</option>
        //             <option value="date">Sort by Date</option>
        //         </select>
        //     </div>);

        // return(
                // sortby selection menu:
                {/* {sortby} */}

        // renders sorted by Title logs:
                {/* {logsSortedTitleMapped} */}
        //);  
// }

/* additional logic: */

// // converts above array into object with eatery name
// const convertArrayToObj = (array, key) => {
//     const initialValue = {};
//     return array.reduce((obj, item) => {
//         return {
//             ...obj,
//             [item[key]]: item,
//         };
//     }, initialValue);
// };
        