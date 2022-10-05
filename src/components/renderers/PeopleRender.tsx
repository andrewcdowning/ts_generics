import * as React from "react";
import IPerson from "../../interfaces/IPerson";
import Moment from "react-moment";

export function PeopleRender(props: IPerson) {
  const { firstName, lastName, eyeColor } = props;
  return (
    <div className="col-12 p-3">
      <div className={"card"}>
        <div className="card-body">
          <h3 className="card-title">
            {firstName} {lastName}
          </h3>
          <ul>
            <li>
              Has <b>{eyeColor}</b> eyes
            </li>
            <li>
              BirthDay:{" "}
              <b>
                <Moment date={props.birthday} format="MMMM D, YYYY" />
              </b>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
