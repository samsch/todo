<item-list>
    <ul>
        <li each="{items}" class={completed: date}>
            <label><input type="checkbox" checked={date} onchange={parent.itemCompleted}> {title}<small if={date}> {date}</small></label>
            <button type="button" onclick={parent.itemDelete}>X</button>
        </li>
    </ul>
    this.items = [{title:"Example"}];
    this.parent.on('newitem', (function(item) {
        this.items.push({title: item, date: null});
        this.update();
    }).bind(this));
    itemDelete(ev) {
        var item = ev.item;
        var index = this.items.indexOf(item);
        this.items.splice(index, 1);
    }
    itemCompleted(ev) {
        var item = ev.item;
        if(ev.target.checked) {
            item.date = new Date();
        }
        else {
            item.date = null;
        }
    }
</item-list>
