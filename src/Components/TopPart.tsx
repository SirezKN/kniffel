import React, {Component} from "react";
import {GameField} from "./GameField";
import {KniffelKind} from "./GameComponent";


export class TopPart extends Component<{ kinds: KniffelKind[], fieldClicked: (kind: KniffelKind) => void  }, { }> {


    render() {
        let sum = this.props.kinds.map(a => a.value != undefined && a.filled ? a.value : 0).reduce((a, b) => a + b);
        return <div>
            <div>
                {this.props.kinds.map(k => <GameField kind={k} fieldClicked={this.props.fieldClicked}/>)}
            </div>
            <div>
                <div>
                    Summe oben
                </div>
                <div>
                    {sum}
                </div>
            </div>
            <div>
                <div>
                    Bonus
                </div>
                <div>
                    {sum > 65 ? 35 : '-'}
                </div>
            </div>
            <div>
                <div>
                    Gesamter oberer Teil
                </div>
                <div>
                    {sum > 65 ? sum + 35 : sum}
                </div>
            </div>
        </div>;
    }
}