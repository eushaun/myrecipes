const commentService = require('../services/commentService');

exports.getComments = async (req, res) => {
  const uid = req.query.uid;
  const rid = req.query.rid;
  const offset = req.query.offset;
  const limit = req.query.limit;

  try {
    const result = await commentService.getComments(uid, rid, offset, limit);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.status).send(err);
  }
};

exports.createComment = async (req, res) => {
  const uid = req.body.uid;
  const rid = req.body.rid;
  const comment = req.body.comment;

  try {
    const result = await commentService.createComment(uid, rid, comment);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.status).send(err);
  }
};


exports.editComment = async (req, res) => {
  const cid = req.body.cid;
  const comment = req.body.comment;

  try {
    const result = await commentService.editComment(cid, comment);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.status).send(err);
  }
};

exports.deleteComment = async (req, res) => {
  const cid = req.params.cid;

  try {
    const result = await commentService.deleteComment(cid);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.status).send(err);
  }
};

exports.flagComment = async(req, res) => {
  const cid = req.body.cid;
  const uid = req.body.uid;

  try {
    const result = await commentService.flagComment(cid, uid);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.status).send(err);
  }
}

exports.unflagComment = async(req, res) => {
  const cid = req.params.cid;
  const uid = req.params.uid;

  try {
    const result = await commentService.unflagComment(cid, uid);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.status).send(err);
  }
}
