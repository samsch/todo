<basic-adder>
    <form onsubmit={submit} action="localhost:8080">
        <input type="text" onkeyup="{changed}">
        <button type="submit" disabled="{!text}">Add</button>
    </form>
    var input;
    this.on('mount', function() {
        input = this.root.querySelector('input');
    });
    changed(ev) {
        this.text = ev.target.value;
    }
    submit(ev) {
        ev.preventDefault();
        this.parent.trigger('newitem', this.text);
        this.text = "";
        input.value = "";
    }
</basic-adder>
