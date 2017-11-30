package entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

// @author Lasse
/*
    img, street, zip, latitude, longitude, description, rating
 */
@Entity(name = "SEED_PLACE")
public class Place implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 30, name = "STREET")
    private String street;

    @Column(length = 5, name = "ZIP")
    private String zip;

    @Column(length = 255, name = "DESCRIPTION")
    private String description;

    @Column(length = 255, name = "IMG")
    private String img;

    @Column(length = 255, name = "LONGITUDE")
    private String longitude;

    @Column(length = 255, name = "LATITUDE")
    private String latitude;

    public Place() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageURL() {
        return img;
    }

    public void setImageURL(String imageURL) {
        this.img = img;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longtitude) {
        this.longitude = longtitude;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

}
