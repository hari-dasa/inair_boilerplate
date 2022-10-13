# InAir Studio React-Bootstrap Custom App Starter

A template for Airtable Custom Apps using React-Bootstrap, in addition to TypeScript and Sass.

## Bootstrap Icons

In React-Bootstrap, and especially in Airtable custom apps, using Bootstrap icons can be a bit tricky. One easy way to do it is by using the library `react-bootstrap-icons`.

Than you may use icons like this:

    // Create a button with a Plus icon
    <Button size="sm" style={{display: 'flex', alignItems: 'center', margin: '.5rem .1rem'}} type="submit">
        <Plus size={20} />
        Add
    </Button>