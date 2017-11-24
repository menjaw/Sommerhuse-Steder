/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 *
 * @author danni
 */
@Entity(name = "SEED_RATING")
public class Rating implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    
    @Column(length = 100, name = "USERID")
    private int userId;
    @Column(length = 100, name = "PLACEID")
    private int placeId;
    @Column(length = 10, name = "RATINGS")
    private int  ratings;

    public Rating() {
    }

    public Rating(int userId, int placeId, int rating) {
        this.userId = userId;
        this.placeId = placeId;
        this.ratings = ratings;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getPlaceId() {
        return placeId;
    }

    public void setPlaceId(int placeId) {
        this.placeId = placeId;
    }

    public int getRating() {
        return ratings;
    }

    public void setRating(int rating) {
        this.ratings = ratings;
    }

    @Override
    public String toString() {
        return "Rating{" + "userId=" + userId + ", placeId=" + placeId + ", ratings=" + ratings + '}';
    }
    
}
