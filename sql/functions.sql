CREATE OR REPLACE FUNCTION public.create_recipe(IN details JSON, IN _instructions JSON, IN _quantities JSON)
RETURNS void
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
	_rid BIGINT;
	_in JSON;
	_q JSON;
	_r JSONB;
BEGIN
	INSERT INTO recipes(title, description, cuisine, mealtype, video, uid, image, prep_time, cook_time, method)
	SELECT title, description, cuisine, mealtype, video, uid, image, prep_time, cook_time, method
	FROM json_populate_record(null::recipes, details)
	RETURNING rid INTO _rid;

	_r = jsonb_build_object('rid', _rid);

	FOR _in IN
       SELECT * FROM json_array_elements(_instructions)
    LOOP
	   	INSERT INTO steps(rid, instructions, image, timer)
		SELECT rid, instructions, image, timer
	   	FROM json_populate_record(null::steps, (_in::jsonb || _r)::json);
    END LOOP;

	FOR _q IN
       SELECT * FROM json_array_elements(_quantities)
    LOOP
	   	INSERT INTO quantities(rid, iid, technique, quantity, unit)
		SELECT rid, iid, technique, quantity, unit
	   	FROM json_populate_record(null::quantities, (_q::jsonb || _r)::json);
    END LOOP;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.full_recipe(IN _uid bigint, IN _conid BIGINT, IN _rid BIGINT)
    RETURNS TABLE(rid BIGINT, title VARCHAR(50), description TEXT, rdate DATE, rtime TIME WITH TIME ZONE,
				  cuisine TEXT, mealtype TEXT, video TEXT, main_image TEXT, prep_time INT, cook_time INT, method TEXT, uid BIGINT, first_name TEXT, last_name TEXT, profile_pic TEXT,
				  likes BIGINT, liked BOOLEAN, subscribed BOOLEAN, comments_count BIGINT,
				 step_number INT, instructions TEXT, image TEXT, timer TEXT)
    LANGUAGE 'plpgsql'

AS $BODY$
BEGIN
	RETURN QUERY
		SELECT r.rid, r.title, r.description, r.rdate, r.rtime, r.cuisine, r.mealtype, r.video, r.image AS main_image, r.prep_time, r.cook_time, r.method,
		u.uid, u.first_name, u.last_name, u.profile_pic,
			(SELECT COUNT(*)
			FROM likes l
			WHERE l.rid = r.rid) AS likes,
			EXISTS (SELECT l.rid FROM likes l WHERE l.rid = r.rid AND l.uid = _uid) AS liked,
			EXISTS (SELECT ss.subid FROM subscribers ss WHERE ss.subid = _uid AND ss.conid = _conid) AS subscribed,
			(SELECT COUNT(*)
			FROM comments c
			WHERE c.rid = r.rid) AS comments_count,
			s.sid, s.instructions, s.image, s.timer
		FROM recipes r
		INNER JOIN steps s
		ON r.rid = s.rid
		INNER JOIN users u
		ON u.uid = r.uid
		WHERE r.course = 'f' AND r.rid = _rid;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.general_feed(IN _uid bigint)
    RETURNS TABLE(rid BIGINT, title VARCHAR(50), description TEXT, image TEXT, rdate DATE, rtime TIME WITH TIME ZONE, prep_time INT, cook_time INT, uid BIGINT, first_name TEXT, last_name TEXT, profile_pic TEXT, likes BIGINT, liked BOOLEAN, comments BIGINT)
    LANGUAGE 'plpgsql'

AS $BODY$
BEGIN
	RETURN QUERY
		SELECT r.rid, r.title, r.description, r.image, r.rdate, r.rtime, r.prep_time, r.cook_time, u.uid, u.first_name, u.last_name, u.profile_pic,
			(SELECT COUNT(*)
			FROM likes l
			WHERE l.rid = r.rid) AS likes,
			EXISTS (SELECT l.rid FROM likes l WHERE l.rid = r.rid AND l.uid = _uid) As liked,
			(SELECT COUNT(*)
			FROM comments c
			WHERE c.rid = r.rid) AS comments,
		FROM recipes r
		INNER JOIN users u
		ON u.uid = r.uid
		WHERE r.course = 'f'
		ORDER BY r.rdate DESC, likes, r.rtime DESC;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.user_recipes(IN _uid bigint, IN _conid bigint)
    RETURNS TABLE(rid BIGINT, title VARCHAR(50), description TEXT, image TEXT, rdate DATE, rtime TIME WITH TIME ZONE, prep_time INT, cook_time INT, uid BIGINT, first_name TEXT, last_name TEXT, profile_pic TEXT, likes BIGINT, liked BOOLEAN, comments BIGINT)
    LANGUAGE 'plpgsql'

AS $BODY$
BEGIN
	RETURN QUERY
		SELECT r.rid, r.title, r.description, r.image, r.rdate, r.rtime, r.prep_time, r.cook_time, u.uid, u.first_name, u.last_name, u.profile_pic,
			(SELECT COUNT(*)
			FROM likes l
			WHERE l.rid = r.rid) AS likes,
			EXISTS (SELECT l.rid FROM likes l WHERE l.rid = r.rid AND l.uid = _uid) As liked,
			(SELECT COUNT(*)
			FROM comments c
			WHERE c.rid = r.rid) AS comments
		FROM recipes r
		INNER JOIN users u
		ON u.uid = r.uid
		WHERE r.course = 'f' AND u.uid = _conid
		ORDER BY r.rdate DESC, likes, r.rtime DESC;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.search(IN _uid bigint, IN _query TEXT[])
    RETURNS TABLE(rid BIGINT, title VARCHAR(50), description TEXT, image TEXT, rdate DATE, rtime TIME WITH TIME ZONE, prep_time INT, cook_time INT, uid BIGINT, first_name TEXT, last_name TEXT, profile_pic TEXT, likes BIGINT, liked BOOLEAN, comments BIGINT)
    LANGUAGE 'plpgsql'

AS $BODY$
BEGIN
	RETURN QUERY
		SELECT r.rid, r.title, r.description, r.image, r.rdate, r.rtime, r.prep_time, r.cook_time, u.uid, u.first_name, u.last_name, u.profile_pic,
			(SELECT COUNT(*)
			FROM likes l
			WHERE l.rid = r.rid) AS likes,
			EXISTS (SELECT l.rid FROM likes l WHERE l.rid = r.rid AND l.uid = _uid) As liked,
			(SELECT COUNT(*)
			FROM comments c
			WHERE c.rid = r.rid) AS comments
		FROM recipes r
		INNER JOIN users u
		ON u.uid = r.uid
		WHERE r.course = 'f' AND r.rid IN
		(SELECT r.rid FROM recipes r
		 INNER JOIN quantities q ON r.rid = q.rid
		 INNER JOIN ingredients i ON q.iid = i.iid
     	 INNER JOIN (SELECT * FROM UNNEST(_query) search_text) _search
         ON r.title iLIKE '%' || _search.search_text || '%'
		 OR r.mealtype iLIKE '%' || _search.search_text || '%'
		 OR r.method iLIKE '%' || _search.search_text || '%'
		 OR i.name iLIKE '%' || _search.search_text || '%')
		ORDER BY r.rdate DESC, likes, r.rtime DESC;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.recommended(IN _uid bigint, IN _rids INT[])
    RETURNS TABLE(rid BIGINT, title VARCHAR(50), description TEXT, image TEXT, rdate DATE, rtime TIME WITH TIME ZONE, prep_time INT, cook_time INT, uid BIGINT, first_name TEXT, last_name TEXT, profile_pic TEXT, likes BIGINT, liked BOOLEAN, comments BIGINT)
    LANGUAGE 'plpgsql'

AS $BODY$
BEGIN
	RETURN QUERY
		SELECT r.rid, r.title, r.description, r.image, r.rdate, r.rtime, r.prep_time, r.cook_time, u.uid, u.first_name, u.last_name, u.profile_pic,
			(SELECT COUNT(*)
			FROM likes l
			WHERE l.rid = r.rid) AS likes,
			EXISTS (SELECT l.rid FROM likes l WHERE l.rid = r.rid AND l.uid = _uid) As liked,
			(SELECT COUNT(*)
			FROM comments c
			WHERE c.rid = r.rid) AS comments
		FROM recipes r
		INNER JOIN users u
		ON u.uid = r.uid
		WHERE r.course = 'f' AND r.rid = ANY(_rids)
		ORDER BY r.rdate DESC, likes, r.rtime DESC;
END;
$BODY$;