import React, {Component} from 'react'
import Card, { CardContent} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import Grid from 'material-ui/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & (0x3 | 0x8));
    return v.toString(16);
  });
}
const categories = [
  {name: 'React', value: 'react'},
  {name: 'Redux', value: 'redux'},
  {name: 'Udacity', value: 'udacity'}
]
function  postObj () {
  return { 
    "id": uuidv4(),
    "timestamp": Date.parse(new Date()),
    "title": "",
    "body": "",
    "author": "",
    "category": "",
    "voteScore": 1,
    "deleted": false,
    "commentCount": 0 
  }
}
let newPost;
class ActionBox extends Component {
  
  constructor () {
    super()
    this.state = {
      title: '',
      body: '',
      author:'',
      category: '',
    }
   newPost = postObj()
   this.handleSubmit = this.handleSubmit.bind(this)
   this.handleDelete = this.handleDelete.bind(this)
   this.handleChange = this.handleChange.bind(this)
  }
  
  handleChange = (e,type) => {
    newPost[e.target.name]= e.target.value
    this.setState({[e.target.name]: e.target.value})
  }
  handleDelete = () => {
    this.props.updatePost({postId: this.props.post, path: this.props.path})
    this.props.actionHandler('','')
  }

  handleSubmit = () => {
    this.props.edit 
    ? this.props.updatePost({postId: this.props.post.id, body: {title: this.state.title,body:  this.state.body}, path:this.props.path})
    : this.props.updatePost({body: newPost,path: this.props.path})
    
    newPost = postObj()
    this.props.actionHandler('','')
  }

  componentWillMount () {
    if(this.props.edit) {
      newPost = this.props.post
      this.setState({
      title: this.props.post.title,
      body:  this.props.post.body,
      })
    }
  }

  render() {
    const {title,body,author,category} = this.state
    const {edit, deletePost} = this.props
    console.log(newPost)
    return (
      <div className="posts">
        <Card >
          <CardContent>
         {!deletePost && <Grid container >
            <Grid item xs={12}>
                <TextField 
                id="title"
                label="Title for the post ..."
                value={title}
                name="title"
                className="inputFields"
                onChange={(e) => this.handleChange(e,'title')}
                margin="normal"
                />
               
              </Grid>
              {!edit && <Grid item xs={12}>
                <TextField 
                 select
                  id="category"
                  label="select category ..."
                  value={category}
                  name="category"
                  className="inputFields"
                  onChange={(e) => this.handleChange(e,'category')}
                  margin="normal">
                  {categories.map((category, index) => <MenuItem key={index} value={category.value}> {category.name}</MenuItem>)}
                  </TextField>
              </Grid>}
              <Grid item xs={12}>
                <TextField
                  multiline
                  rowsmin="4"
                  id="body"
                  label="Your Post here ..."
                  value={body}
                  name="body"
                  className="inputFields"
                  onChange={(e) => this.handleChange(e,'body')}
                  margin="normal"/>
              </Grid>
              {!edit && <Grid item xs={12}>
                <TextField 
                id="author"
                label="your name..."
                value={author}
                className="inputFields"
                name="author"
                onChange={(e) => this.handleChange(e,'author')}
                margin="normal"/>
              </Grid>}
              <Grid item xs={12} >
              <Divider light />
                <Button variant="outlined" color="primary" className="button-submit" onClick={this.handleSubmit}>
                  {!edit ? 'POST' : 'UPDATE'}
                </Button>
              
              <Button variant="outlined" color="primary" className="button-submit" onClick={() => this.props.actionHandler('','')}>
                CLOSE
              </Button>
              </Grid>
            </Grid>}
            {deletePost && <Grid container style={{marginTop: '15%'}}>
              <Grid item xs={3}></Grid>
              <Grid item xs={6}>
                <Grid item xs={12}>Are you sure you want to delete this post... </Grid>
                <Grid item xs={12}>
                  <Button variant="outlined" color="primary" className="button-submit" onClick={this.handleDelete}>
                    DELETE
                  </Button>
                  <Button variant="outlined" color="primary" className="button-submit" onClick={() => this.props.actionHandler('','')}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>}
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default ActionBox