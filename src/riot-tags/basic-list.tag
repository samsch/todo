<basic-list>
    <h1>Todo list</h1>
    <ul>
        <li each="{ items }">{ title } : { date }</li>
    </ul>
    this.items = [{title:"Example"}];
    this.parent.on('newitem', (function(item) {
        this.items.push({title: item});
        this.update();
    }).bind(this));
</basic-list>
